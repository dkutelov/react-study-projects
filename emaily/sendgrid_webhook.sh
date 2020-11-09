function localtunnel {
  lt -s https://emailydk140569.localtunnel.me --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
