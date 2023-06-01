defmodule GachaMemories.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      GachaMemoriesWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: GachaMemories.PubSub},
      # Start the Endpoint (http/https)
      GachaMemoriesWeb.Endpoint
      # Start a worker by calling: GachaMemories.Worker.start_link(arg)
      # {GachaMemories.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: GachaMemories.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    GachaMemoriesWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
