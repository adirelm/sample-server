import {
  Table,
  Column,
  AllowNull,
  Model,
  BelongsTo,
  DataType,
  ForeignKey,
  AfterCreate,
  Default,
} from "sequelize-typescript";
import moment from "moment";
import { authenticator } from "otplib";
import { ApiError } from "../helpers/error";
import { Status as UserStatus } from "./user";

import User from "./user";

const ATTEMPTS_ALLOWED = 5;

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Table
export default class Otp extends Model {
  @AllowNull(false)
  @Column
  secret: string;

  @AllowNull(false)
  @Column
  expiresAt: Date;

  @AllowNull(false)
  @Default(0)
  @Column
  attempts: number;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @AfterCreate
  static async inactiveAllOtpOfUser(instance: Otp, options: any) {
    const records = await Otp.findAll({
      where: { userId: instance.userId },
      order: [["created_at", "DESC"]],
      offset: 1,
    });
    records.forEach(async (record) => {
      await record.update({ status: Status.INACTIVE });
    });
  }

  async validateOtp(otpCode: string): Promise<true> {
    if (this.status !== Status.ACTIVE || this.expiresAt < moment().toDate()) {
      await this.update({ status: Status.INACTIVE });
      throw new ApiError(
        400,
        "Code expired due too much attempts or due expiry"
      );
    }
    this.attempts = this.attempts + 1;
    const isValidCode = authenticator.verify({
      token: otpCode,
      secret: this.secret,
    });
    if (!isValidCode) {
      if (this.attempts === ATTEMPTS_ALLOWED) {
        this.status = Status.INACTIVE;
      }
      await this.save();
      throw new ApiError(400, "Invalid code");
    }

    await this.save();
    return true;
  }

  async afterSuccessfulActivation() {
    const user = await User.findByPk(this.userId);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    await user.update({ status: UserStatus.ACTIVE });
    await this.update({ status: Status.INACTIVE });
  }
}
