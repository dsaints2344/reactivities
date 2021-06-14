namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSucess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T vlaue) => new Result<T>{IsSucess = true, Value = vlaue};
        public static Result<T> Failure(string error) => new Result<T>{IsSucess = false, Error = error};
    }
}