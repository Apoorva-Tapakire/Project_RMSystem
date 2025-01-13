class MenuItemsController < ApplicationController
  before_action :authorize_request

  def index
    menu_items = MenuItem.all
    render json: menu_items
  end

  def create
    menu_item = MenuItem.create(menu_item_params)
    render json: menu_item, status: :created
  end

  def update
    menu_item = MenuItem.find(params[:id])
    menu_item.update(menu_item_params)
    render json: menu_item
  end

  def destroy
    menu_item = MenuItem.find(params[:id])
    menu_item.destroy
    render json: { message: 'Menu item deleted' }, status: :ok
  end

  private

  def menu_item_params
    params.require(:menu_item).permit(:name, :price, :description)
  end

  def authorize_request
    token = request.headers['Authorization']&.split(' ')&.last
    begin
      decoded = JWT.decode(token, 'your_secret_key', true, algorithm: 'HS256')
      @current_user = User.find(decoded[0]['user_id'])
    rescue JWT::DecodeError
      render json: { message: 'Unauthorized' }, status: :unauthorized
    end
  end
end