import { UNDEFINED_VALUE } from "../enums/General";

interface FoldExpressions<R, Err, Val> {
	fnError: (error: Err) => R;
	fnOk: (value: Val) => R;
}

type Ok<Val> = Either<Val, never>;
type ErrorType<Err> = Either<never, Err>;

/**
 * Represents a value that can either be a success or an error.
 *
 * The `Either` class is a functional programming construct that can represent a computation
 * that might either return a successful result (`Ok`) or an error (`Error`). It provides a
 * way to handle both outcomes in a safe and predictable manner. This is particularly useful
 * for handling errors or computations that can return multiple types of results.
 *
 * @generic Val - The type of the successful value.
 * @generic Err - The type of the error value.
*/
export class Either<Val, Err> {
	private constructor(
		private readonly value?: Val,
		private readonly error?: Err
	) {}

	static Ok<ValueType>(value: ValueType): Ok<ValueType> {
		return new Either(value);
	}

	static Error<ErrType>(error: ErrType): ErrorType<ErrType> {
		return new Either(UNDEFINED_VALUE as never, error);
	}

	isOk(): this is Ok<Val> {
		return this.value !== UNDEFINED_VALUE;
	}

	isError(): this is ErrorType<Err> {
		return this.error !== UNDEFINED_VALUE;
	}

	getValue(): Val {
		if (!this.isOk()) {
			throw new Error("You can only access the value in an instance that is Ok");
		}
		return this.value as Val;
	}

	getError(): Err {
		if (!this.isError()) {
			throw new Error("You can only access the value in an instance that is Error");
		}
		return this.error as Err;
	}

	fold<R>(expressions: FoldExpressions<R, Err, Val>): R {
		if (this.isError()) {
			return expressions.fnError(this.error as Err);
		}
		return expressions.fnOk(this.value as Val);
	}
}
