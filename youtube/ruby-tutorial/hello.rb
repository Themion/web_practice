hash = { a: 1, b: 2 }
hash[:c] = 3

nums.each do |num|
    val += num.to_f
end
text = "text"

puts val
hash[text] = 4

puts hash
puts hash[:text] == hash["text"]
puts hash['c'] == nil