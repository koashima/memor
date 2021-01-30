defmodule Memor.Repo do
  use Ecto.Repo,
    otp_app: :memor,
    adapter: Ecto.Adapters.Postgres
end
