defmodule GachaMemoriesWeb.Router do
  use GachaMemoriesWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GachaMemoriesWeb do
    pipe_through :api
  end

  scope "/app", GachaMemoriesWeb do
    get "/", FrontendController, :index, as: :root
    get "/*path", FrontendController, :index
  end
end
