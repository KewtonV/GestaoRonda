import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateHistoryOpenCompetenciesMonthServiceImage from '@modules/historic/services/UpdateHistoryOpenCompetenciesMonthServiceImage';

export default class HistoricOpenCompetenciesMonthImageController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateProcedureImage = container.resolve(
      UpdateHistoryOpenCompetenciesMonthServiceImage,
    );
    const id: number = +request.params.id;
    await updateProcedureImage.execute({
      historicId: id,
      historicFileName: request.file.filename,
    });
    return response.status(200).json({ message: 'Image saved successfully' });
  }
}
