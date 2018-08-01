module Api
  module V1

    class SuddentripsController < ApplicationController
      before_action :set_suddentrip, only: [:show, :update, :destroy]

      def index
        render json: Suddentrip.includes(:users), include: ['users']
      end

      def create
        @suddentrip = Suddentrip.new(suddentrip_params)

        if @suddentrip.save
          render json: @suddentrip
        else
          render json: @suddentrip.errors, status: :unprocessable_entity
        end
      end

      def update

        if @suddentrip.update(suddentrip_params)
            render json: @suddentrip
          else
            render json: @suddentrip.errors, status: :unprocessable_entity
          end
      end

      private
      def suddentrip_params
        params.require(:suddentrip).permit(:name, :location, :date, :latitude, :longitude, :rating, :destinations)
      end

      def set_suddentrip
        @suddentrip = Suddentrip.find(params[:id])
      end

    end
  end
end
