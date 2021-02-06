defmodule MemorWeb.Api.Schema do
  use Absinthe.Schema
  alias Memor.Todos
  import_types Absinthe.Type.Custom

  object :todo_item do
    field :id,  non_null(:id) #ID!
    field :content, non_null(:string)
    field :inserted_at, non_null(:naive_datetime)
    field :updated_at, :naive_datetime
    field :is_completed, non_null(:boolean) do
      resolve(fn %{completed_at: completed_at}, _, _ ->
        {:ok, !is_nil(completed_at)}
      end)
    end
  end

  mutation do
    field :create_todo_item, :todo_item do
      arg(:content, non_null(:string))
      resolve(fn %{content: content}, _ ->
        Todos.create_item(%{content: content})
      end)
    end

    field :update_todo_item, :todo_item do
      arg(:id, non_null(:id))
      arg(:content, non_null(:string))
      resolve(fn %{id: id, content: content}, _ ->
        todo = Todos.get_item!(id)
        Todos.update_item(todo, %{content: content})
      end)
    end

    field :delete_todo_item, :boolean do
      arg(:id, non_null(:id))
      resolve(fn %{id: id}, _ ->
        todo = Todos.get_item!(id)
        Todos.delete_item(todo)
        {:ok, true}
      end)
    end

    field :toggle_todo_item, :todo_item do
      arg(:id, non_null(:id))
      resolve(fn %{id: item_id}, _ ->
        Todos.toggle_item_by_id(item_id)
      end)
    end
  end

  query do
    #[TodoItem!]!
    field :todo_items, non_null(list_of(:todo_item)) do
      resolve(fn _, _ ->
        {:ok, Todos.list_items()}
      end)
    end
  end

end
