# class OrdersController < ApplicationController
#     before_action :authenticate_customer, only: [:create, :index]
  
#     # Create a new order
#     def create
#       order = @current_user.orders.new(order_params)
  
#       if order.save
#         render json: { message: 'Order placed successfully', order: order }, status: :created
#       else
#         render json: { error: order.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
  
#     # View order history for the logged-in customer
#     def index
#       orders = @current_user.orders.includes(:order_items)
#       render json: orders.as_json(include: { order_items: { include: :menu_item } }), status: :ok
#     end
  
#     private
  
#     def order_params
#       params.require(:order).permit(order_items_attributes: [:menu_item_id, :quantity])
#     end
#   end
  

# class OrdersController < ApplicationController
#     before_action :authenticate_user! # Ensure the user is authenticated
  
#     def create
#       order = current_user.orders.new(order_params)
  
#       if order.save
#         render json: { message: "Order created successfully", order: order }, status: :created
#       else
#         render json: { error: order.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
  
#     private
  
#     def order_params
#       params.require(:order).permit(order_items_attributes: [:menu_item_id, :quantity])
#     end
#   end
  

# class OrdersController < ApplicationController
#     before_action :authenticate_customer, only: [:create, :index]
  
#     # Create a new order
#     def create
#       order = @current_user.orders.new(order_params)
  
#       if order.save
#         render json: { message: 'Order placed successfully', order: order }, status: :created
#       else
#         render json: { error: order.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
  
#     # View order history for the logged-in customer
#     def index
#       orders = @current_user.orders.includes(:order_items)
#       render json: orders.as_json(include: { order_items: { include: :menu_item } }), status: :ok
#     end
  
#     private
  
#     def order_params
#       params.require(:order).permit(order_items_attributes: [:menu_item_id, :quantity])
#     end
#   end
  


class OrdersController < ApplicationController
    before_action :authenticate_customer, only: [:create, :index]
  
    # Create a new order
    def create
      order = @current_user.orders.new(order_params)
  
      if order.save
        render json: { message: 'Order placed successfully', order: order }, status: :created
      else
        render json: { error: order.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # View order history for the logged-in customer
    def index
      orders = @current_user.orders.includes(:order_items)
      render json: orders.as_json(include: { order_items: { include: :menu_item } }), status: :ok
    end
  
    private
  
    def order_params
      params.require(:order).permit(order_items_attributes: [:menu_item_id, :quantity])
    end
  end
  