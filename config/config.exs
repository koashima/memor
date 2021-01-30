# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :memor,
  ecto_repos: [Memor.Repo]

# Configures the endpoint
config :memor, MemorWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "5/B84f+VZ/wM8aCHbzq2sapRqnfckZOt5F9nRkoLaTeHZxSWcS8b118/r+WMsFqn",
  render_errors: [view: MemorWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Memor.PubSub,
  live_view: [signing_salt: "ZK31Di6u"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
