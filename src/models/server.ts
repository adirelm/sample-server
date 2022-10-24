import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
  AfterSave,
  AfterCreate,
} from "sequelize-typescript";
import { Status } from "./history";
import { sendMailToAdminWelcome } from "../helpers/email";
import { sendMailToAdminStatusChanged } from "../helpers/email";

import History from "./history";

@Table
export default class Server extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  url: string;

  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @AllowNull(false)
  @Column
  admin_mail: string;

  @HasMany(() => History)
  histroy: History[];

  @AfterSave
  static async sendStatusMail(instance: Server, options: any) {
    if (instance.changed("status")) {
      await sendMailToAdminStatusChanged(
        instance.name,
        instance.url,
        instance.status,
        instance.admin_mail
      );
    }
  }

  @AfterCreate
  static async sendWelcomeMail(instance: Server, options: any) {
    await sendMailToAdminWelcome(
      instance.name,
      instance.url,
      instance.admin_mail
    );
  }
}
