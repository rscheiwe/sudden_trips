module Api
  module V1

    class UsersController < ApplicationController

      def index
        render json: User.includes(:suddentrips), include: ['suddentrips']
      end

    end
  end
end
