mkdir ./lab1
cp ./dist/* ./lab1/
cp -r ./api ./lab1/
scp -r ./lab1 helios:~/public_html/lab1
rm -rf ./lab1