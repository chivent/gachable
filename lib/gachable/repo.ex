defmodule Gachable.Repo do
  use Ecto.Repo,
    otp_app: :gachable,
    adapter: Ecto.Adapters.Postgres
end
