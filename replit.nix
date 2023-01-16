{ pkgs }: {
    deps = [
        pkgs.cowsay
        pkgs.nodejs
        pkgs.nodePackages.npm
        pkgs.openssl
    ];
}