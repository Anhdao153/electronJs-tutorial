Khi sử dụng thằng này để code. Thì hãy sử dụng bash, vì bcrypt yêu cầu phải dùng armm64e còn mặc định mình dùng x84_x64

# Switch to an arm64e shell by default
if [ `machine` != arm64e ]; then
    echo 'Execing arm64 shell'
    exec arch -arm64 bash
fi