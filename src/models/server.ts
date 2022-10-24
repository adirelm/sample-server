import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
  AfterSave,
  AfterCreate,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { Status } from "./history";
import { sendMailToAdminWelcome } from "../helpers/email";
import { sendMailToAdminStatusChanged } from "../helpers/email";

import User from "./user";
import History from "./history";

@Table
export default class Server extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Unique
  @Column
  url: string;

  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @AllowNull(false)
  @Column
  adminMail: string;

  @HasMany(() => History)
  histroy: History[];

  @BelongsTo(() => User)
  users: User[];

  @Column
  @ForeignKey(() => User)
  adminId: number;

  @AfterSave
  static async sendStatusMail(instance: Server, options: any) {
    if (instance.changed("status")) {
      await sendMailToAdminStatusChanged(
        instance.name,
        instance.url,
        instance.status,
        instance.adminMail
      );
    }
  }

  @AfterCreate
  static async sendWelcomeMail(instance: Server, options: any) {
    await sendMailToAdminWelcome(
      instance.name,
      instance.url,
      instance.adminMail
    );
  }
}
