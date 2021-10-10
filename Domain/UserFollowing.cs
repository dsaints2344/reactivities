namespace Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }
        public string targetId { get; set; }
        public AppUser Target { get; set; }
    }
}