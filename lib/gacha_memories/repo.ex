defmodule GachaMemories.Repo do
  use Ecto.Repo,
    otp_app: :gacha_memories,
    adapter: Ecto.Adapters.Postgres
end
