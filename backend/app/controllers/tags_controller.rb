class TagsController < ApplicationController
    def index
        @tags = Tag.all
        render json: @tags, include: [:topic, :entry]
    end

    def create
        @new_tag = Tag.new(tag_params)
        if @new_tag.valid?
            @new_tag.save
            render json: @new_tag, status: :created
        else
            render json: { errors: @new_tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @tag = Tag.find_all_by id: params[:id]
        render json: @tag, include: [:entries, :topics]
    end

    def destroy
        @delete_tag = Tag.find_by id: params[:id]
        @delete_tag.destroy
    end

    def tag_params
        params.require(:tag).permit(:name, :entry_id, :topic_id)
    end
end
