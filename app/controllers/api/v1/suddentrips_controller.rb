module Api
  module V1

    class SuddentripsController < ApplicationController

      def index
        render json: Suddentrip.includes(:users), include: ['users']
      end

    end
  end
end
