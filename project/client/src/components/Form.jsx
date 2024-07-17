export default function Form({
  handleSubmit,
  setUsername,
  setPassword,
  isLoginForm,
  isWrongPassword,
  password,
  username,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col mt-8">
      <div className="flex flex-col">
        <label htmlFor="username" className="hidden">
          username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          className="h-14 rounded-md mb-5"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="hidden">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="h-14 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          className={isLoginForm && isWrongPassword && !password && !username ? "block" : "hidden"}
        >
          Wrong password or username
        </p>
      </div>
      <button type="submit" className="mt-7 bg-gray-500 rounded-md w-1/3 h-10 mx-auto">
        {isLoginForm ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
}
