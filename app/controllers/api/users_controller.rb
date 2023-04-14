class Api::UsersController < ApplicationController

    def create
            @user = User.new(user_params)

        if @user.save
                    login(@user)
                    render :show
        else
            error_messages = @user.errors.full_messages
                if error_messages.include?("Password digest required")
                    error_messages.each_with_index do |message, idx|
                        error_messages[idx] = "Password cannot be blank" if message == "Password digest required"
                    end
                end
                    render json: error_messages, status: 422
                end
        end
    end
def update
    @user = User.find_by_username(params[:username]);

        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status => 422
        end
end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
