import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProcedureImageService from '@modules/ocorrencia/services/UpdateOcorrenciaService';

export default class ProcedureImageController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateProcedureImage = container.resolve(UpdateProcedureImageService);
    await updateProcedureImage.execute({
      procedureId: request.params.id,
      procedureFileName: request.file.filename,
    });
    return response.status(200).json({ message: 'Image saved successfully' });
  }
}
