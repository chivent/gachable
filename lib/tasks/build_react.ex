defmodule Mix.Tasks.BuildReact do
  @moduledoc """
    React frontend compilation and bundling for production.
    Credits to @brunojppb
  """
  use Mix.Task
  require Logger

  # Path for the frontend static assets that are being served
  # from our Phoenix router when accessing /app/* for the first time
  @public_path "./priv/static/frontend"

  @shortdoc "Compile and bundle React frontend for production"
  def run(_) do
    Logger.info("Installing NPM packages")
    System.cmd("npm", ["install", "--quiet"], cd: "./frontend")

    Logger.info("Compiling React frontend")
    System.cmd("npm", ["run", "build"], cd: "./frontend")

    Logger.info("Moving dist folder to Phoenix at #{@public_path}")
    System.cmd("rmdir", ["-rf", @public_path])

    System.cmd("copy", ["./frontend/build", @public_path])

    Logger.info("⚛️  - React frontend ready.")
  end
end
