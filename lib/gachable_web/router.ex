defmodule GachableWeb.Router do
  use GachableWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GachableWeb do
    pipe_through :api
  end

  scope "/app", GachableWeb do
    get "/", FrontendController, :index, as: :root
    get "/*path", FrontendController, :index
  end
end
