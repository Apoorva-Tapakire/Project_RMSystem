# class AuthController < ApplicationController

#     def signup
#         user = User.create(user_params)
#         if user.valid?
#           render json: { token: encode_token(user.id) }, status: :created
#         else
#           render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
#         end
#       end
    
#       def login
#         user = User.find_by(username: params[:username])
#         if user&.authenticate(params[:password])
#           render json: { token: encode_token(user.id) }
#         else
#           render json: { message: 'Invalid credentials' }, status: :unauthorized
#         end
#       end
    
#       private
    
#       def user_params
#         params.require(:user).permit(:username, :password, :role)
#       end
    
#       def encode_token(user_id)
#         JWT.encode({ user_id: user_id }, 'your_secret_key')
#       end
      
# end


class AuthController < ApplicationController
  # Sign up action
  def signup
    user = User.create(user_params)
    if user.valid?
      # Return the token and role upon successful signup
      render json: { token: encode_token(user.id), role: user.role }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Login action
  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      # Return the token and role upon successful login
      render json: { token: encode_token(user.id), role: user.role }
    else
      render json: { message: 'Invalid credentials' }, status: :unauthorized
    end
  end

  private

  def user_params
    # Ensure role is included, default to customer if not provided
    params.require(:user).permit(:username, :password, :role).tap do |whitelisted|
      whitelisted[:role] ||= 'customer' # Default role is customer if not provided
    end
  end

  def encode_token(user_id)
    # Generate JWT with the user ID and secret key
    JWT.encode({ user_id: user_id }, 'your_secret_key', 'HS256')
  end
end
