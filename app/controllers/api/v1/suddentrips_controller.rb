module Api
  module V1

    class SuddentripsController < ApplicationController

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

      private
      def suddentrip_params
        params.require(:suddentrip).permit(:name, :location, :date, :latitude, :longitude, :rating, :destinations)
      end



    end
  end
end
