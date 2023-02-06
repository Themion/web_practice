input = gets.chomp()
nums = input.split(' ')

val = 0

nums.each do |num|
    val += num.to_f
end

puts val
