import { StatusCode } from "./StatusCode";

interface IProps {
  statusCode?: StatusCode;
  message?: string;
  data?: string;
}

abstract class ServiceResponse {
  constructor(props: IProps) {
    Object.assign(this, props);
  }
}

class SuccessResponse extends ServiceResponse {
  constructor(props: Omit<ServiceResponse, "statusCode">) {
    super({
      statusCode: StatusCode.SUCCESS,
      ...props,
    });
  }
}

class CreatedResponse extends ServiceResponse {
  constructor(props: Omit<ServiceResponse, "statusCode">) {
    super({
      statusCode: StatusCode.CREATED,
      ...props,
    });
  }
}

export { ServiceResponse, SuccessResponse, CreatedResponse };
