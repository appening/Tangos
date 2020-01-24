import { BaseModel } from '../models/base.model';
import { StandardException } from '../exceptions/StandardException';
import { InvalidParamsException } from '../exceptions/InvalidParamsException';
import { BaseResponse } from '../responses/BaseResponse';

export class BasePresenter {
  public baseModel: BaseModel;

  protected constructor(baseModel: BaseModel) {
    this.baseModel = baseModel;
  }

  public find = (query: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await this.baseModel
          .getModelSchema()
          .find(query != null ? JSON.parse(query) : {});
        if (data != null && data.length != 0)
          resolve(BaseResponse.getSuccessResponse(data));
        else resolve(BaseResponse.getEmptyResponse());
      } catch (e) {
        reject(new StandardException());
      }
    });
  };

  public findOne = (query: string) => {
    return new Promise<BaseResponse>(resolve => {
      this.baseModel
        .getModelSchema()
        .findOne(query != null ? JSON.parse(query) : {})
        .then(data => {
          if (data != null) resolve(BaseResponse.getSuccessResponse(data));
          else resolve(BaseResponse.getEmptyResponse());
        });
    });
  };

  public update = (query: string, data: string) => {
    return new Promise<BaseResponse>((resolve, reject) => {
      // const id = request.params.id;
      if (data != null) {
        this.baseModel
          .getModelSchema()
          .updateMany(
            query != null ? JSON.parse(query) : {},
            { $set: data != null ? JSON.parse(data) : {} },
            { new: true }
          )
          .then(data => {
            if (data != null) resolve(BaseResponse.getSuccessResponse(data));
            else reject(new StandardException());
          });
      } else reject(new InvalidParamsException());
    });
  };

  public create = (data: string) => {
    return new Promise(async (resolve, reject) => {
      if (data != null) {
        const createdPost = new (this.baseModel.getModelSchema())(
          JSON.parse(data)
        );
        try {
          let savedPost = await createdPost.save();
          if (savedPost != null)
            resolve(BaseResponse.getSuccessResponse(savedPost));
          else reject(new StandardException());
        } catch (e) {
          reject(new StandardException());
        }
      } else reject(new InvalidParamsException());
    });
  };

  public deleteData = (query: string) => {
    // const id = request.params.id;
    return new Promise<BaseResponse>((resolve, reject) => {
      this.baseModel
        .getModelSchema()
        .deleteMany(query != null ? JSON.parse(query) : {})
        .then(successResponse => {
          if (successResponse)
            resolve(BaseResponse.getSuccessResponse(successResponse));
          else reject(new StandardException());
        });
    });
  };
}
