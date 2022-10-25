import {
  AllowNull,
  Column,
  Model,
  Table,
  HasMany,
  DataType,
  Unique,
  AfterCreate,
  BeforeCreate,
  Default,
} from "sequelize-typescript";
import moment from "moment";
import { authenticator } from "otplib";

import Otp from "./otp";
import Server from "./server";
import History from "./history";
import { ApiError } from "../helpers/error";
import fs from "fs/promises";
import { userInfo } from "os";

export enum Status {
  PENDING = "pending",
  ACTIVE = "active",
}

@Table
export default class User extends Model {
  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Default(Status.PENDING)
  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @HasMany(() => Server)
  servers: Server[];

  @HasMany(() => History)
  history: History[];

  @HasMany(() => Otp)
  otp: Otp[];

  async generateOtp(): Promise<string> {
    try {
      const expiresAt = moment().add(10, "minutes").toDate();
      authenticator.options = {
        step: moment.duration(10, "minutes").asSeconds(),
      };
      const sharedSecret = authenticator.generateSecret();
      const otpCode = authenticator.generate(sharedSecret);
      await this.$create("otp", {
        secret: sharedSecret,
        status: Status.ACTIVE,
        expiresAt,
      });

      return otpCode;
    } catch (error) {
      const err = error as Error;
      throw new ApiError(500, err.message);
    }
  }
}
