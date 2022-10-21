import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Server extends Model {
  @Column
  name: string;

  @Column
  url: string;
}
