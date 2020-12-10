import { Request, Response } from 'express';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import { getRepository } from 'typeorm';

export default class CompaniesController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    const companiesRepository = getRepository(Company);
    const company = await companiesRepository.findOne(id);
    return response.status(200).json(company);
  }
}
