defmodule GachaMemoriesWeb.FrontendController do
  use GachaMemoriesWeb, :controller

  def index(conn, _params) do
    conn
    |> send_resp(200, render_react_app())
  end

  # Serve the index.html file as-is and let React
  # take care of the rendering and client-side rounting.
  #
  # Potential improvement: Cache the file contents here
  # in an ETS table so we don't read from the disk for every request.
  defp render_react_app() do
    Application.app_dir(:gacha_memories, "priv/static/frontend/index.html")
    |> File.read!()
  end
end
