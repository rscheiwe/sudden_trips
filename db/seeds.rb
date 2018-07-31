# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# 10.times do
#   User.create(
#     username: Faker::Name.name_with_middle,
#   )
# end

# 10.times do
#   Suddentrip.create(
#     name: Faker::FunnyName.name,
#     latitude: Faker::Number.decimal(2, 6),
#     longitude: Faker::Number.decimal(2, 6),
#     location: Faker::Address.community,
#     rating: Faker::Number.between(1, 100),
#     date: Faker::Date.between(2.days.ago, Date.today),
#     destinations: [{name:Faker::Address.street_name, address:Faker::Address.full_address, rating:Faker::Number.between(1, 100), order_number:Faker::Number.number(1)}, {name:Faker::Address.street_name, address:Faker::Address.full_address, rating:Faker::Number.between(1, 100), order_number:Faker::Number.number(1)}]
#   )
# end

10.times do
  UserSuddentrip.create(
    user_id: rand(1..10),
    suddentrip_id: rand(4..13)
  )
end
