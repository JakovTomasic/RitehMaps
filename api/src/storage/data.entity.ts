import { ALL_DATA_ENTRY_ID } from 'src/constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class AllData {

  @PrimaryColumn({ default: ALL_DATA_ENTRY_ID })
  id: number;

  @Column()
  professors: string;
}
