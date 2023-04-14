Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :update]
    resource :session, only: [:create, :destroy, :show, :index]
    resource :notes, only: [:create, :update, :destroy, :show, :index]
    resource :tags, only: [:index, :create, :show, :destroy]
  end

  get 'api/notes/:id/tags', to: 'api/notes#tags'
  delete 'api/tagging/:id', to: 'api/tags#destroyTagging'
end
