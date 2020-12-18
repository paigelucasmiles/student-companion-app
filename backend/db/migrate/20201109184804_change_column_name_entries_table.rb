class ChangeColumnNameEntriesTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :entries, :type, :kind
  end
end
