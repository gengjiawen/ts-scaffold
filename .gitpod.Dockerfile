FROM gitpod/workspace-full:latest

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

# force gitpod docker image update
ENV TRIGGER_REBUILD=3

RUN brew install n && sudo /home/linuxbrew/.linuxbrew/bin/n latest && sudo /usr/local/bin/npm i -g yarn sao
ENV PATH=/usr/local/bin/:/home/gitpod/.esvu/bin:$PATH

ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin/:$PATH"

USER root
# share env see https://github.com/gitpod-io/workspace-images/issues/472
RUN echo "PATH="${PATH}"" | sudo tee /etc/environment