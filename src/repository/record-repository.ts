import { Service } from "typedi"
import { getRepository, Repository } from "typeorm"
import RecordEntity from "../entity/record-entity"
import AbstractRepository from "./abstract-repository"

@Service()
export default class RecordRepository extends AbstractRepository<RecordEntity> {
  getRepository<RecordEntity>(): Repository<RecordEntity> {
    return getRepository<RecordEntity>(RecordEntity)
  }
}
