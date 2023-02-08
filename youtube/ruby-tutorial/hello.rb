file = File.open('./file.txt', 'w')
file.write("File has overwritten!")
file.close()

file = File.open('./file.txt', 'r')
puts file.read()
file.close()

file = File.open('./file.txt', 'a')
file.write("\nHello Ruby!")
file.close()

file = File.open('./file.txt', 'r+')
puts file.read()
file.write("\nFile has re-overwritten!")
puts file.read()
file.close()

file = File.open('./index.html', 'w')
file.write('<h1>Hello HTML!</h1>')
file.close()
