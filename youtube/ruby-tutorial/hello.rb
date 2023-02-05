str = "      this is a random string      "
puts str.upcase().downcase().strip().length()
puts str.length()
puts str.include? "random"
puts str.include? "certain"

str = str.strip()

puts str[0, 7]
puts str.index('s')
