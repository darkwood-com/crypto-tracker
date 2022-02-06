import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity({
  name: "record",
})
export default class RecordEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  uid: string
  
  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column()
  exchange: string

  @Column()
  date: Date

  @Column()
  type: "DEPOSIT" | "WITHDRAW" | "EARN" | "SWAP_BUY" | "SWAP_SELL" | "FEE"
  
  @Column()
  address: string
  
  @Column("double")
  amount: number

  @Column()
  currency: string
}
