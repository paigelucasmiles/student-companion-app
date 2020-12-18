class EntriesController < ApplicationController
    def index
        @entries = Entry.all
        render json: @entries, include: [:tags, :topics]
    end

    def create
        @new_entry = Entry.new(entry_params)
        if @new_entry.valid?
            @new_entry.save
            render json: @new_entry, status: :created
        else
            render json: { errors: @new_entry.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @entry = Entry.find_by id: params[:id]
        render json: @entry, include: [:tags, :topics]
    end

    def destroy
        @delete_entry = Entry.find_by id: params[:id]
        @delete_entry.destroy
    end

    def entry_params
        params.require(:entry).permit(:name, :url, :kind)
    end
end
