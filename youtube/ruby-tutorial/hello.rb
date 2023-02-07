print("Enter first number: ")
num1 = gets.chomp().to_f()

print("Enter opertor(+, -, *, /): ")
operator = gets.chomp()

print("Enter second number: ")
num2 = gets.chomp().to_f()

val = 0

case operator
when '+'
     val = num1 + num2
when '-'
    val = num1 - num2
when '*'
    val = num1 * num2
when '/'
    val = num1 / num2
end

puts("Result: " + val.to_s)
