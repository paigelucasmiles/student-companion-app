class TopicsController < ApplicationController
    def index
        @topics = Topic.all
        render json: @topics, include: [:entries, :tags]
    end

    def create
        @topic = Topic.new(topic_params)
        if @topic.valid?
            @topic.save
            render json: @topic, status: :created
        else
            render json: { errors: @topic.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def topic_params
        params.require(:topic).permit(:name, :url, :kind)
    end

    def show
        @topic = Topic.where(id: params[:id]).all
        render json: @topic, include: [:entries, :tags]
    end
end
