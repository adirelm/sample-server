import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import Server from "./server";

export enum Status {
  SUCCESS = "success",
  FAILURE = "failure",
}
@Table
export default class History extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(Status)))
  status: Status;

  @AllowNull(false)
  @ForeignKey(() => Server)
  @Column
  serverId: number;

  @BelongsTo(() => Server)
  server: Server;
}
