---
layout: post
title:  "Programmer vs. API Builder Mindset"
date:   2014-07-24
tags:
- code
- API
---

As is the case with most introspective, renaissance men such as <span class='tooltip' title='renaissanceman.jpg'>myself</span> (kidding! But no really…) I’m really into thinking about mindsets. One examination of different mindsets that has gotten a lot of attention recently, and deservingly so as it’s probably more important to lifelong development and happiness than anything else (bold statement… but true) is the examination of the growth vs fixed mindset. But that conversation is for a different time! (Until then, look at everything as an opportunity for self improvement rather than a weakness, a failure, “just the way you are" or any other bullshit). Today, I want to talk about another important mindset transformation: the programmer vs API builder mindset (shout out to <a href='http://stevecorona.com/'>Steve Corona</a> and the <a href='http://rubyrogues.com/'>Ruby Rougues</a> podcast team for discussing this in their awesome <a href='http://rubyrogues.com/162-rr-scaling-rails-with-steve-corona/'>podcast</a>).

A really common problem I have in almost anything I do (and I don’t think I’m the only one who has this problem) is that I look at everything I am attempting as if I am building the <span class='tooltip' title='tajmahal.jpg'>Taj Mahal</span>. Whether its writing a blog post, going to the gym, cleaning my apartment, or writing a web app, I always have the tendency to think about whatever I’m doing as a singular, life-changing endeavor. If I’m going to write a blog post it’s going to rival fucking Hemmingway (think <a href='http://blogs.baruch.cuny.edu//greatworksspring2014/files/2014/03/Hills-Like-White-Elephants-Ernest-Hemingway.pdf'>Hills Like White Elephants</a>). If I’m going to go the gym I’m going to <span class='tooltip' title='kg.jpg'>crush weights like KG</span> and <span class='tooltip' title='lance.jpg'>spin like Lance</span> (while doping!). If I’m going to clean my apartment, I’m going scrub toilets, vacuum, and color sort my button-downs. And if I’m going to write a web app I’m going to <span class='tooltip' title='swordfish.gif'>spew fucking lightning bolts from my fucking fingers until I’ve hacked the Department of Defense Hugh Jackman style circa Swordfish</span>.

While each of these extremist approaches can and have lead to lots of success for me, they are not necessarily the right approach and very rarely are the most efficient approach. What ends up happening is that you get fixated on perfection, which holds you back from taking small steps towards your end goals. Want to get in better shape? It’s not about the perfect workout – it’s about banging out 20 push-ups, 10 times a day and nailing a 15-minute run. Rome wasn’t built in a day, ya know? You think the romans were just like oh yeah let’s build this sick set up with a  Coliseum and a Pantheon and all this other insane shit. No way dude. They were like, we need a fighting area so they built a mini arena - and then they were like, people seem to really like this so let's build some seating to make it easier to watch - and then they were like, whoa people really dig this, let's build an entire stadium with royal boxes and training archives and even more seating until one day they had the <span class='tooltip' title='Coliseum.jpg'>Coliseum</span>. Each step was taken individually and each piece they built serves a purpose of its own and could exist independently of the rest. They could, although it might be a little weird, extract out the fighting arena and put it right in the middle of the Pantheon.

This line of thinking should be applied to coding. I’m not just talking about breaking up writing an application into several steps, although you should obviously do that. I’m talking about thinking about each piece of your application as its own mini application… or a separate API. This is the shift from the “programmer mindset”, where you think: how do I code this up into an entire application, to an “API builder mindset”, where you think: how do I make this search bar API or this game logic API and then just tie your APIs together. Once you’ve made this incredibly powerful shift from programmer to API builder it makes your larger application/API much more versatile and makes managing inevitably increasing levels of complexity as you scale possible, even, dare I say, <span class='tooltip' title='fun.jpg'>fun</span>!

I mean, if you take a step back, everything is really just an API (<span class='tooltip' title='whoa.gif'>whoaaa</span>) and we, as developers, are all just building APIs of varying levels of complexity tied to varying numbers of other APIs. As long as you can publish an interface that your users expect in some format, whether it’s a URL (a URL is just an API right?) or a REST API – as long as you publish this saying this is our contract of what we are going to respond to then it doesn’t matter who serves it, or what language your serving it in (whether it be rails, java, c, php, go, node, haskcal, or ... brainfuck etc), or where you are serving it (whether it be a repository on github or a program or a service you have running on your own machine). This way you can begin to think about development as building out small, reusable services (APIs) rather than one tightly coupled application.

And once you begin to really embrace this API builder mindset it has lots of benefits for the project you’re working on. Your technology is no longer simply one application or one API, but a series of versatile APIs that can be customized and plugged in to other people’s APIs depending on their needs, which is a powerful, momentum-gathering, scalable notion (ever heard of this thing called the <span class='tooltip' title='worldwideweb.jpg'>world wide web</span>?!).

End of regular reading. Nerds read on!

A simple example of this is a project I am currently working on called <a href='http://www.smartipantsgame.com'>SmartiPants</a>. SmartiPants is a cognitive self-improvement game and research aid. It provides users with a simple, dynamic platform to improve their memory by playing <a href='http://en.wikipedia.org/wiki/N-back'>n-Back</a>, while also providing researchers with a powerful data collection tool. But there are tons of different applications or variations of how you might want to use the nBack game (for data collection... for fun). So, my team and I thought, why not build an <a href='https://github.com/reidcovington/nback-gem'>nBack game log API (ruby gem)</a> and then anyone can simply plug into that API and use it with whatever views they have built and apply it for their own varying business logics.

We extracted the Game Model from the Javascript MVC portion of our codebase and turned it into a stand alone nBack Game logic Ruby Gem.

<a href='http://www.smartipantsgame.com'>Game Model from SmartiPantsGame.com</a>:
{% highlight javascript %}
function GameModel(n, roundAttributes, gameMode, delegate){
    this.delegate = delegate;
    this.n = n;
    this.gameMode = gameMode;
    this.roundAttributes = roundAttributes;
    this.rounds = [];
    this.makeRounds();
};
GameModel.prototype = {
    makeRounds: function(){
        for (var i = 0; i < 20 + this.n; i++){
            this.rounds[i] = new RoundModel(i+1, this.roundAttributes);
        }
    },
    scoreGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        currentRound[attribute + 'Key'] = true;
        if (currentRound[attribute] === pastRound[attribute]){
            this.delegate.provideFeedback(attribute, 'success')
            currentRound[attribute + 'Guess'] = true;
        } else if (currentRound[attribute] != pastRound[attribute]){
            this.delegate.provideFeedback(attribute, 'danger')
        };
    },
    scoreNonGuess: function(attribute, roundIndex){
        var pastRound = this.rounds[roundIndex - this.n];
        var currentRound = this.rounds[roundIndex];
        if (!currentRound[attribute + 'Key'] && !(currentRound[attribute] === pastRound[attribute])){
            currentRound[attribute + 'Guess'] = true;
        }
    },
    calculateTotalScore: function(){
        var totalPoints = 0;
        for (var i = 0; i < this.rounds.length; i++){
            if (this.rounds[i].colorGuess){ totalPoints++ };
            if (this.rounds[i].soundGuess){ totalPoints++ };
            if (this.rounds[i].positionGuess){ totalPoints++ };
        };
        return totalPoints;
    }
};
{% endhighlight %}

<a href='https://github.com/reidcovington/nback-gem'>nBack Game Logic Ruby Gem API</a>:
{% highlight ruby %}
class NbackGame
  def initialize(n, round_attributes)
    @n = n
    @game_mode = game_mode
    @round_attributes = round_attributes
    @rounds = []
  end

  def generate_rounds
    @round_number = 1
    @n + 20.times do
      @rounds << Round.new(@round_number, @round_attributes)
      @round_number += 1
    end
  end

  def evaluate_users_guess(current_round_number, attribute)
    @current_round = @rounds[current_round_number - 1]
    @nback_round = @rounds[current_round_number - 1 - @n]

    if current_round_number > @n
      if @current_round.round_attributes[attribute.to_sym] == @nback_round.round_attributes[attribute.to_sym]
        @current_round.round_attributes["#{attribute}_correct".to_sym] = true
      else
        @current_round.round_attributes["#{attribute}_correct".to_sym] = false
      end
    else
      @current_round.round_attributes["#{attribute}_correct".to_sym] = false
    end
  end

  def evaluate_non_response(current_round_number)
    @current_round = @rounds[current_round_number - 1]
    @nback_round = @rounds[current_round_number - 1 - @n]

    if current_round_number < @n
      @round_attributes.each_key do |attribute|
        if @current_round.round_attributes["#{attribute}_correct".to_sym] == nil
          if @current_round.round_attributes[attribute.to_sym] != @nback_round.round_attributes[attribute.to_sym]
            @current_round.round_attributes["#{attribute}_correct".to_sym] = true
          end
        end
      end
    else
      @round_attributes.each_key do |attribute|
        if @current_round.round_attributes["#{attribute}_correct".to_sym] == nil
          if @current_round.round_attributes[attribute.to_sym] != @nback_round.round_attributes[attribute.to_sym]
            @current_round.round_attributes["#{attribute}_correct".to_sym] = true
          else
            @current_round.round_attributes["#{attribute}_correct".to_sym] = false
          end
        end
      end
    end
  end

  def show_round_attributes(round_number)
    @rounds[round_number - 1].round_attributes
  end
end
{% endhighlight %}

It really wasn’t very difficult at all (shout out to my boy <a href='http://www.siyanbeverly.com/'>Siyan</a> for taking the lead on this). As you can see, the core of our app, the Game Model, and its fundamental characteristics (using n value to create each round of the game with whatever attributes your game calls for + scoring each round) was easily extracted into a Ruby gem.

The simple key is, as I’ve reiterated, taking small pieces of code that could exist on their own and converting them to their own, self-sufficient APIs. By making this mental transition to breaking everything down into small object oriented APIs suddenly the whole world becomes a network of tiny, linked together APIs, which together make up this incredibly complex thing called… planet earth. Okay, I’ve got a little bit of a <span class='tooltip' title='dramatics.jpg'>flare for the dramatics</span>, but it is pretty fucking cool, ya?!

