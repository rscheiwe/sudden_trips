require 'rails/application_controller'
class StaticController < Rails::ApplicationController
  def index
    # if params[:search]
    render file: Rails.root.join("public", "index.html")
  end
end
