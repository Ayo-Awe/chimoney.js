export abstract class ChimoneyError extends Error {
  constructor(message = "Chimoney Error") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ChimoneyAPIError extends ChimoneyError {
  constructor(message = "Chimoney Error") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValueError extends ChimoneyError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthKeyError extends ChimoneyError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
